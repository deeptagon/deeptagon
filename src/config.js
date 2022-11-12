export default {
  API: {
    baseUrl: process.env.NODE_ENV === "production"
      ? window.location.href + "api/"
      : "http://localhost:3001/"
  },
  paths: {
    vehicle: "/vehicle/"
  }
}