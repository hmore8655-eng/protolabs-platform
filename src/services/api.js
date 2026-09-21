const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('protolabs_token') || 'admin_offline_token';
  return { 'Authorization': `Bearer ${token}` };
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error ${res.status}`);
  }
  return res.json();
};

export const api = {
  // Auth
  async login(password, email = 'protolabs26@gmail.com') {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await handleResponse(res);
    if (data.token) {
      localStorage.setItem('protolabs_token', data.token);
    }
    return data;
  },

  async loginWithGoogle(credential) {
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential })
    });
    const data = await handleResponse(res);
    if (data.token) {
      localStorage.setItem('protolabs_token', data.token);
    }
    return data;
  },

  async getAuthConfig() {
    try {
      const res = await fetch(`${API_BASE}/auth/config`);
      return await res.json();
    } catch (e) {
      return { googleClientId: '', authorizedEmails: ['hmore8655@gmail.com', 'protolabs26@gmail.com'] };
    }
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  logout() {
    localStorage.removeItem('protolabs_token');
  },

  // Projects
  async getProjects() {
    const res = await fetch(`${API_BASE}/projects`);
    return handleResponse(res);
  },

  async createProject(projectData) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(projectData)
    });
    return handleResponse(res);
  },

  async updateProject(id, updatedFields) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(updatedFields)
    });
    return handleResponse(res);
  },

  async deleteProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async reorderProjects(projects) {
    const res = await fetch(`${API_BASE}/projects/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ projects })
    });
    return handleResponse(res);
  },

  async bulkImportProjects(projects) {
    const res = await fetch(`${API_BASE}/projects/bulk-import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ projects })
    });
    return handleResponse(res);
  },

  // Inquiries
  async getInquiries() {
    const res = await fetch(`${API_BASE}/inquiries`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async submitInquiry(inquiryData) {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });
    return handleResponse(res);
  },

  async updateInquiryStatus(id, status, notes = '', quotedPrice = '', customMessage = '') {
    const res = await fetch(`${API_BASE}/inquiries/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status, notes, quotedPrice, customMessage })
    });
    return handleResponse(res);
  },

  async deleteInquiry(id) {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Portfolio
  async getPortfolio() {
    const res = await fetch(`${API_BASE}/portfolio`);
    return handleResponse(res);
  },

  async createPortfolio(itemData) {
    const res = await fetch(`${API_BASE}/portfolio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(itemData)
    });
    return handleResponse(res);
  },

  async updatePortfolio(id, fields) {
    const res = await fetch(`${API_BASE}/portfolio/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(fields)
    });
    return handleResponse(res);
  },

  async deletePortfolio(id) {
    const res = await fetch(`${API_BASE}/portfolio/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Testimonials
  async getTestimonials() {
    const res = await fetch(`${API_BASE}/testimonials`);
    return handleResponse(res);
  },

  async createTestimonial(itemData) {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(itemData)
    });
    return handleResponse(res);
  },

  async updateTestimonial(id, fields) {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(fields)
    });
    return handleResponse(res);
  },

  async deleteTestimonial(id) {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Settings
  async getSettings() {
    const res = await fetch(`${API_BASE}/settings`);
    return handleResponse(res);
  },

  async updateSettings(payload) {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(payload)
    });
    return handleResponse(res);
  },

  // File Upload
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    return handleResponse(res);
  },

  // Reset Demo
  async resetDemo() {
    const res = await fetch(`${API_BASE}/reset-demo`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Live Client-Admin Chat
  async getChatThreads() {
    const res = await fetch(`${API_BASE}/chat/threads`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async getChatMessages(threadId) {
    const res = await fetch(`${API_BASE}/chat/messages/${threadId}`);
    return handleResponse(res);
  },

  async sendChatMessage(payload) {
    const res = await fetch(`${API_BASE}/chat/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(payload)
    });
    return handleResponse(res);
  },

  async markChatThreadSeen(threadId, isSeen = true) {
    const res = await fetch(`${API_BASE}/chat/threads/${threadId}/seen`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ isSeen })
    });
    return handleResponse(res);
  },

  async deleteChatThread(threadId) {
    const res = await fetch(`${API_BASE}/chat/threads/${threadId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Database Cloud Status & Backup Management
  async getDatabaseStatus() {
    const res = await fetch(`${API_BASE}/database/status`);
    return handleResponse(res);
  },

  async exportBackup() {
    const res = await fetch(`${API_BASE}/admin/export`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async restoreBackup(backupData) {
    const res = await fetch(`${API_BASE}/admin/restore`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(backupData)
    });
    return handleResponse(res);
  }
};
