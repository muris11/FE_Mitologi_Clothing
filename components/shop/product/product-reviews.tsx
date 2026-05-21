"use client";

import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { Button } from "components/ui/button";
import { ApiError, getProductReviews, submitReview } from "lib/api";
import { ReviewItem, ReviewSummary } from "lib/api/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { storageUrl } from "lib/utils/storage-url";

export function ProductReviews({ handle }: { handle: string }) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);
        const data = await getProductReviews(handle, 1);
        if (data) {
          const fetchedReviews =
            data.reviews?.data || (data as any)?.reviews || [];
          setReviews(Array.isArray(fetchedReviews) ? fetchedReviews : []);
          setSummary(data.summary || null);
        } else {
          setReviews([]);
          setSummary(null);
        }
      } catch (err) {
        setReviews([]);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, [handle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setErrorMsgs(["Silakan pilih rating bintang."]);
      return;
    }

    if (!comment || comment.trim().length < 10) {
      setErrorMsgs(["Ulasan wajib diisi minimal 10 karakter."]);
      return;
    }

    setSubmitting(true);
    setErrorMsgs([]);
    setSuccessMsg("");

    try {
      await submitReview(handle, { rating, comment });
      setSuccessMsg("Ulasan berhasil dikirim!");
      setRating(0);
      setComment("");
      setShowForm(false);

      await (async () => {
        try {
          setLoading(true);
          const data = await getProductReviews(handle, 1);
          if (data) {
            setReviews(data.reviews.data || []);
            setSummary(data.summary || null);
          } else {
            setReviews([]);
            setSummary(null);
          }
        } catch (err) {
        } finally {
          setLoading(false);
        }
      })();
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 401) {
        setErrorMsgs([
          "Silakan login terlebih dahulu untuk memberikan ulasan.",
        ]);
      } else if (err instanceof ApiError && err.status === 403) {
        setErrorMsgs(["Anda belum pernah membeli atau menerima produk ini."]);
      } else if (err instanceof ApiError && err.status === 422 && err.errors) {
        const msgs = Object.values(err.errors).flat() as string[];
        setErrorMsgs(msgs);
      } else if (err instanceof Error && err.message) {
        setErrorMsgs([err.message]);
      } else {
        setErrorMsgs(["Terjadi kesalahan saat mengirim ulasan."]);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading && !reviews.length) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-slate-400">Memuat ulasan...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-slate-900">
          Ulasan ({summary?.totalReviews || 0})
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm font-medium text-slate-900 underline underline-offset-4 hover:text-slate-600 transition-colors"
        >
          {showForm ? "Batal" : "Tulis ulasan"}
        </button>
      </div>

      {summary && summary.totalReviews > 0 && (
        <div className="flex items-start gap-8 mb-8 pb-8 border-b border-slate-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {Number(summary.averageRating || 0).toFixed(1)}
            </div>
            <div className="flex gap-0.5 justify-center mb-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(Number(summary.averageRating || 0))
                      ? "text-amber-400"
                      : "text-slate-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400">
              {summary.totalReviews} ulasan
            </p>
          </div>

          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const breakdown = summary.ratingBreakdown || {};
              const count = breakdown[star] || breakdown[star.toString()] || 0;
              const total = summary.totalReviews || 0;
              const percentage = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-3">{star}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 w-5 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {successMsg && (
        <div className="p-3 mb-6 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-sm">
          {successMsg}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 pb-8 border-b border-slate-100"
        >
          {errorMsgs.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm">
              {errorMsgs.map((msg, idx) => (
                <p key={idx}>{msg}</p>
              ))}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Rating
            </label>
            <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  className="focus:outline-none"
                >
                  {star <= (hoverRating || rating) ? (
                    <StarIcon className="w-7 h-7 text-amber-400" />
                  ) : (
                    <StarOutline className="w-7 h-7 text-slate-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Ulasan
            </label>
            <textarea
              id="comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ceritakan pengalaman Anda (min. 10 karakter)"
              className="w-full p-3 border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-0 text-sm bg-white text-slate-700 placeholder:text-slate-400 transition-colors resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {submitting ? "Mengirim..." : "Kirim Ulasan"}
          </Button>
        </form>
      )}

      <div className="space-y-0 divide-y divide-slate-100">
        {reviews.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-500">
              Belum ada ulasan. Jadilah yang pertama!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="py-6 first:pt-0">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {review.userAvatar ? (
                    <Image
                      src={storageUrl(review.userAvatar)}
                      alt={review.userName}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-medium">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-900">
                      {review.userName}
                    </span>
                    <span className="text-xs text-slate-400">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>

                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          review.rating >= star
                            ? "text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {review.comment}
                  </p>

                  {review.adminReply && (
                    <div className="mt-3 pl-4 border-l-2 border-slate-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-slate-700">
                          Mitologi Clothing
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          Penjual
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {review.adminReply}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
