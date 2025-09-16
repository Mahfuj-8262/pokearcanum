// src/lib/api.ts
// Centralized API client for .NET backend

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL as string;// || "http://localhost:5278/api"; // backend base URL

if (!API_URL) {
  console.error("❌ API_URL is not set. Did you create .env.local?");
}
// 🔑 Tokens (kept in memory, refresh in localStorage)
let accessToken: string | null = null;
let refreshToken: string | null =
  typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;

// ----------------------------
// Helpers
// ----------------------------

export const setTokens = (tokens: { accessToken: string; refreshToken: string }) => {
  accessToken = tokens.accessToken;
  refreshToken = tokens.refreshToken;
  if (typeof window !== "undefined") {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

const authHeaders = (): Record<string, string> => {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

// Main fetch wrapper with auto-refresh
// Main fetch wrapper with auto-refresh
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  retry = true
) => {
  // normalize headers to plain object
  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...authHeaders(),
  };

  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        baseHeaders[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        baseHeaders[key] = value;
      });
    } else {
      Object.assign(baseHeaders, options.headers);
    }
  }

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: baseHeaders,
    // credentials: "include",
  });

  // If unauthorized → try refresh once
  if (res.status === 401 && retry && refreshToken) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiRequest(endpoint, options, false); // retry once
    }
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || res.statusText);
  }

  return res.json().catch(() => ({}));
};

// ----------------------------
// Auth Endpoints
// ----------------------------

export const register = (userName: string, email: string, password: string) =>
  apiRequest("/User/register", {
    method: "POST",
    body: JSON.stringify({ userName, email, password }),
  });

export const login = async (email: string, password: string) => {
  const res = await apiRequest("/User/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  setTokens(res);
  return res;
};

export const refreshAccessToken = async () => {
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_URL}/User/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    setTokens(data);
    return data;
  } catch (err) {
    console.error("Refresh failed", err);
    return null;
  }
};

export const logout = () => {
  accessToken = null;
  refreshToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("refreshToken");
  }
};

export const updateProfile = (data: {
  userName: string;
  currentPassword: string;
  newPassword: string;
}) =>
  apiRequest("/User/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });

// ----------------------------
// Cards Endpoints
// ----------------------------

export const getCards = () => apiRequest("/Card");

export const getCardById = (id: number) => apiRequest(`/Card/${id}`);

export const postCard = (card: {
  cardName: string;
  hp: number;
  rarity: string;
  type: string;
  link: string;
  description?: string;
}) =>
  apiRequest("/Card", {
    method: "POST",
    body: JSON.stringify(card),
  });

export const updateCard = (id: number, card: any) =>
  apiRequest(`/Card/${id}`, {
    method: "PUT",
    body: JSON.stringify(card),
  });

export const deleteCard = (id: number) =>
  apiRequest(`/Card/${id}`, {
    method: "DELETE",
  });

// ----------------------------
// Marketplace Endpoints
// ----------------------------

export const getAllMarketplaces = () => apiRequest("/Marketplace/all");

export const getMarketplace = () => apiRequest("/Marketplace");

export const getMarketplaceById = (id: number) =>
  apiRequest(`/Marketplace/${id}`);

export const postMarketplace = (listing: {
  cardName: string;
  hp: number;
  rarity: string;
  type: string;
  link: string;
  description: string;
  price: number;
  status: number; // corresponds to ListingStatus enum
}) =>
  apiRequest("/Marketplace", {
    method: "POST",
    body: JSON.stringify(listing),
  });

export const updateMarketplace = (id: number, data: { price: number; status: number }) =>
  apiRequest(`/Marketplace/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteMarketplace = (id: number) =>
  apiRequest(`/Marketplace/${id}`, {
    method: "DELETE",
  });

// ----------------------------
// Trades Endpoints
// ----------------------------

export const getTrades = () => apiRequest("/Trade");

export const getTradeById = (id: number) => apiRequest(`/Trade/${id}`);

export const postTrade = (marketplaceId: number) =>
  apiRequest("/Trade", {
    method: "POST",
    body: JSON.stringify({ marketplaceId }),
  });


// Dashboard homepage stats
export const getUserCount = () => apiRequest("/User/count");

export const getTradeStats = () => apiRequest("/Trade/stats");

export const getRecentTrades = () => apiRequest("/Trade/recent");

// Top cards
export const getTopCards = () => apiRequest("/Marketplace/top");