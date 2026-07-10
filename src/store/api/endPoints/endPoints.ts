export const endPoint = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    emailVerify: "/auth/send-email-verification",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyOtp: "/auth/verify-email",
  },

  profile: {
    getProfile: "/profile",
    updateProfile: "/profile",
    uploadAvatar: "/profile/upload-avatar",
  },

  hotels: {
    //Hotels
    getHotels: "/hotels",
    getHotelById: (id: number) => `/hotel-management/hotels/${id}`,
    getHotelDetail: (id: number) => `/hotel-management/hotels/${id}`,
    addHotel: "/hotel-management/hotels",
    editHotel: (id: number) => `/hotel-management/hotels/${id}`,
    deleteHotel: (id: number) => `/hotel-management/hotels/${id}`,
    deleteHotelImage: (hotelId: number, imageId: number) => `/hotel-management/hotels/${hotelId}/images/${imageId}`,

    //rooms
    getHotelRooms: `/room-management/hotels/rooms`,
    getAvailableRooms: "/room-management/rooms/availability",
    getRoomsByHotelId: (hotelId: number) => `/room-management/hotels/${hotelId}/rooms`,
    getRoomDetail: (id: number) => `/room-management/rooms/${id}`,
    addHotelRoom: `/room-management/rooms`,
    updateHotelRoom: (id: number) => `/room-management/rooms/${id}`,
    deleteHotelRoom: (id: number) => `/room-management/rooms/${id}`,
    deleteRoomImage: (roomId: number, imageId: number) => `/room-management/rooms/${roomId}/images/${imageId}`,

    //Amenities
    getAmenities: "/hotel-management/amenities",
    addAmenities: "/hotel-management/amenities",
    addBulkAmenitiesInHotel: (id: number) => `/hotel-management/hotels/${id}/amenities/bulk`,
    deleteHotelAmenity: (hotelId: number, amenityId: number) =>
      `/hotel-management/hotels/${hotelId}/amenities/${amenityId}`,
    updateAmenities: (id: number) => `/hotel-management/amenities/${id}`,
    deleteAmenities: (id: number) => `/hotel-management/amenities/${id}`,

    //Policies
    getPolicies: `/hotel-management/hotels/policies`,
    addPolicies: (id: number) => `/hotel-management/hotels/${id}/policies`,
    updatePolicies: (hotelId: number, policyId: number) => `/hotel-management/hotels/${hotelId}/policies/${policyId}`,
    deletePolicy: (hotelId: number, policyId: number) => `/hotel-management/hotels/${hotelId}/policies/${policyId}`,
  },

  bookings: {
    createBooking: `/booking`,
    getBookings: "/booking/my",
    bookingById:(id:number)=>`/booking/${id}`
  },

  wishList: {
    getWishList: "/wishlists",
    addToWishList: `/wishlists`,
    removeFromWishList: (hotelId: number) => `/wishlists/${hotelId}`,
  },

  payments: {
    makePayment: `/Payment/create`,
    verifyPayment: `/Payment/verify`,
  },

  review: {
    createReview: "/review",
    getMyReviews: "/review/my",
    getAllRevies:"/review",
    getHotelReviews: (hotelId: number) => `/review/hotel/${hotelId}`,
  },
  // --Notifications
  notifications: {
    getNotifications: "/notifications",
    getNotificationCount: "/notifications/unread-count",
    readNotification: (id: number) => `/notifications/${id}/read`,
    readAllNotifications: "/notifications/read-all",
    deleteNotification: (id: number) => `/notifications/${id}`,
  },
  chat:{
    sendMessage:"/chat"
  }
};