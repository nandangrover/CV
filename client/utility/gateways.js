export default {
    async getJson(id) {
        const response = await fetch(`/api/dataBlob/getJson/${btoa(id)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.json();
    },

    async setJson(id, data) {
      const response = await fetch(`/api/dataBlob/setJson/${btoa(id)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ jsonData: data }),
        });
      return response.json();
  },

  async updateJson(id, data) {
    const response = await fetch(`/api/dataBlob/updateJson/${btoa(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jsonData: data }),
      });
    return response.json();
},
}