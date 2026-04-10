"use client";

import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { Button } from "components/ui/button";
import { ApiError, getProductReviews, submitReview } from "lib/api";
import { ReviewItem, ReviewSummary } from "lib/api/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ProductReviews({ handle }: { handle: string }) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form state
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
          // Fallback array checks: data.reviews.data or data.reviews depending on pagination/wrapping
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
      setSuccessMsg("Ulasan berhasil dikirim! Terima kasih.");
      // Reset form
      setRating(0);
      setComment("");
      setShowForm(false);

      // Refresh reviews list
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
          // Graceful fail
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
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-16 text-center">
        <div className="text-sm font-sans font-medium text-slate-400">
          Memuat ulasan...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mt-16">
      <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-8 border-b border-slate-100 pb-6">
        Ulasan Pembeli
      </h2>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        <div className="md:col-span-4 flex flex-col items-center justify-center py-8 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="text-5xl font-sans font-bold mb-3 text-mitologi-navy">
            {summary ? Number(summary.averageRating || 0).toFixed(1) : "0.0"}{" "}
            <span className="text-xl text-slate-400 font-normal">/ 5</span>
          </div>
          <div className="flex gap-1.5 mb-3 text-2xl">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={
                  i < Math.round(Number(summary?.averageRating || 0))
                    ? "fill-current text-mitologi-gold"
                    : "text-slate-300 fill-transparent stroke-[1.5]"
                }
              />
            ))}
          </div>
          <p className="text-slate-500 text-sm font-sans font-medium">
            Berdasarkan {summary ? summary.totalReviews || 0 : 0} ulasan
          </p>
        </div>

        <div className="md:col-span-8 flex flex-col justify-center space-y-4 py-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const breakdown = summary?.ratingBreakdown || {};
            const count = breakdown[star] || breakdown[star.toString()] || 0;
            const total = summary?.totalReviews || 0;
            const percentage = total > 0 ? (count / total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-4">
                <div className="flex items-center justify-end gap-1.5 w-12 text-sm font-sans font-bold text-slate-500">
                  <StarIcon className="w-4 h-4 text-mitologi-gold" /> {star}
                </div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-mitologi-gold rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-8 text-right text-sm text-slate-500 font-sans font-medium">
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write Review Button / Success Message */}
      <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
        <div>
          <h3 className="font-sans font-bold text-lg text-mitologi-navy mb-1">
            Pernah membeli produk ini?
          </h3>
          <p className="text-sm font-sans text-slate-500">
            Bagikan pengalaman Anda kepada pengguna lain
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "secondary" : "primary"}
          className="mt-4 sm:mt-0 shadow-sm"
        >
          {showForm ? "Batal Menulis" : "Tulis Ulasan"}
        </Button>
      </div>

      {successMsg && (
        <div className="p-4 mb-8 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-medium flex items-center gap-3">
          <svg
            className="w-5 h-5 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          {successMsg}
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-slate-50 p-8 border border-slate-200 shadow-sm rounded-2xl"
        >
          <h3 className="font-sans font-bold text-lg text-mitologi-navy mb-6 border-b border-slate-200 pb-4">
            Form Ulasan Produk
          </h3>

          {errorMsgs.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm">
              <ul className="list-disc pl-5 space-y-1">
                {errorMsgs.map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-sans font-bold text-mitologi-navy mb-3">
              Rating Bintang <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  {star <= (hoverRating || rating) ? (
                    <StarIcon className="w-10 h-10 text-mitologi-gold" />
                  ) : (
                    <StarOutline className="w-10 h-10 text-slate-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="comment"
              className="block text-sm font-sans font-bold text-mitologi-navy mb-3"
            >
              Ulasan Anda <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ceritakan pengalaman Anda menggunakan produk ini. Kualitas bahan, kenyamanan, atau ukuran (min. 10 karakter)."
              className="w-full p-4 border border-slate-200 rounded-xl focus:border-mitologi-navy focus:ring-1 focus:ring-mitologi-navy text-sm font-sans bg-white text-slate-700 shadow-sm placeholder:text-slate-400 transition-shadow"
              required
            ></textarea>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={submitting}
              variant="primary"
              size="lg"
            >
              {submitting ? "Mengirim..." : "Kirim Ulasan"}
            </Button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-8 mt-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-700 font-sans font-bold text-lg mb-2">
              Belum ada ulasan untuk produk ini.
            </p>
            <p className="text-sm font-sans text-slate-500">
              Jadilah yang pertama untuk memberikan ulasan!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="pt-8 first:pt-0 border-t border-slate-100 first:border-0"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1 hidden sm:block">
                  {review.userAvatar ? (
                    <Image
                      src={review.userAvatar}
                      alt={review.userName}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-mitologi-navy flex items-center justify-center font-sans font-bold text-lg shadow-sm">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <div className="flex items-center gap-3 mb-1 sm:mb-0">
                      {/* Mobile Avatar included in name row */}
                      <div className="flex-shrink-0 sm:hidden">
                        {review.userAvatar ? (
                          <Image
                            src={review.userAvatar}
                            alt={review.userName}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover border border-slate-100"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-mitologi-navy flex items-center justify-center font-bold text-xs">
                            {review.userName.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <h4 className="font-sans font-bold text-base text-mitologi-navy">
                        {review.userName}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-400 font-sans ml-11 sm:ml-0">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>

                  <div className="flex gap-1 text-mitologi-gold mb-3 ml-11 sm:ml-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-4 h-4 ${review.rating >= star ? "text-mitologi-gold" : "text-slate-200 stroke-[1.5]"}`}
                      />
                    ))}
                  </div>

                  <p className="text-slate-600 text-sm font-sans leading-relaxed whitespace-pre-wrap ml-11 sm:ml-0">
                    {review.comment}
                  </p>

                  {/* Admin Reply */}
                  {review.adminReply && (
                    <div className="mt-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 relative ml-11 sm:ml-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-mitologi-navy text-mitologi-cream flex items-center justify-center text-xs font-sans font-bold shadow-sm">
                          M
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-sm text-mitologi-navy">
                            Mitologi Clothing
                          </span>
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-mitologi-gold bg-mitologi-gold/10 px-2 py-0.5 rounded-md">
                            Penjual
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-sans text-slate-600 leading-relaxed whitespace-pre-wrap pl-11">
                        {review.adminReply}
                      </p>
                      <div className="text-xs font-sans text-slate-400 text-right mt-3">
                        {review.adminRepliedAt
                          ? formatDate(review.adminRepliedAt)
                          : ""}
                      </div>
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
