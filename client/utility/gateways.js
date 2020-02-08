export default {
    async getJson(id, theme = 'themeElon_1') {
        const response = await fetch(`/api/dataBlob/getJson/${btoa(id)}/${theme}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.json();
    },

    async setJson(id, theme = 'themeElon_1', data) {
      const response = await fetch(`/api/dataBlob/setJson/${btoa(id)}/${theme}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ jsonData: data }),
        });
      return response.json();
  },

  async updateJson(id, theme = 'themeElon_1', data) {
    const response = await fetch(`/api/dataBlob/updateJson/${btoa(id)}/${theme}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jsonData: data }),
      });
    return response.json();
},
}