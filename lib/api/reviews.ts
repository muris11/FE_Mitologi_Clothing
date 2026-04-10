import { ENDPOINTS } from "./endpoints";
import { apiFetch } from "./index";
import { ReviewItem, ReviewSummary } from "./types";

export async function getProductReviews(
  handle: string,
  page: number = 1,
): Promise<{
  summary: ReviewSummary;
  reviews: {
    data: ReviewItem[];
    currentPage: number;
    lastPage: number;
    total: number;
  };
} | null> {
  try {
    const url = `${ENDPOINTS.PRODUCT_REVIEWS(handle)}?page=${page}`;
    return await apiFetch<{
      summary: ReviewSummary;
      reviews: {
        data: ReviewItem[];
        currentPage: number;
        lastPage: number;
        total: number;
      };
    }>(url, {}, [`product-reviews-${handle}`]);
  } catch (error) {
    return null;
  }
}

export async function submitReview(
  handle: string,
  data: { rating: number; comment?: string; images?: FileList | null },
): Promise<{ message: string; review: ReviewItem }> {
  const formData = new FormData();
  formData.append("rating", data.rating.toString());
  if (data.comment) {
    formData.append("comment", data.comment);
  }

  if (data.images) {
    for (let i = 0; i < data.images.length; i++) {
      const file = data.images.item(i);
      if (file) formData.append("images[]", file as Blob);
    }
  }

  return await apiFetch<{ message: string; review: ReviewItem }>(
    ENDPOINTS.REVIEW_STORE(handle),
    {
      method: "POST",
      body: formData,
    },
  );
}

export async function updateReview(
  reviewId: number,
  data: { rating: number; comment?: string; images?: FileList | null },
): Promise<{ message: string; review: ReviewItem }> {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("rating", data.rating.toString());
  if (data.comment) {
    formData.append("comment", data.comment);
  }

  if (data.images) {
    for (let i = 0; i < data.images.length; i++) {
      const file = data.images.item(i);
      if (file) formData.append("images[]", file as Blob);
    }
  }

  return await apiFetch<{ message: string; review: ReviewItem }>(
    ENDPOINTS.REVIEW_UPDATE(reviewId),
    {
      method: "POST",
      body: formData,
    },
  );
}

export async function deleteReview(
  reviewId: number,
): Promise<{ message: string }> {
  return await apiFetch<{ message: string }>(
    ENDPOINTS.REVIEW_DELETE(reviewId),
    {
      method: "DELETE",
    },
  );
}
