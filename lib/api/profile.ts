// Re-export dari account.ts sebagai single source of truth untuk menghindari duplikasi
export {
  getProfile,
  updateAvatar,
  updatePassword,
  updateProfile,
} from "./account";
