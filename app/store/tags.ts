import axios from "axios"

export const useTagsStore = defineStore('tagsStore', {
  state: () => ({
    pagination: null,
    tags: [],
    tag: null,
    errors: null,
  }),

  actions: {
    async getTags(page: Number) {
      let res = await axios.get('http://127.0.0.1:8000/api/tags', {
        params: { page }
      });
      this.pagination = res.data;
      this.tags = res.data.data;
    },

    async getTag(id: number) {
      if (this.tags.length) {
        this.tag = this.tags.find((t: any) => t.id === id);
      } else {
        let res = await axios.get('http://127.0.0.1:8000/api/tags/' + id);
        this.tag = res.data;
      }
    },

    async createTag({ name }: any) {
      try {
        await axios.post('http://127.0.0.1:8000/api/admin/tags', {
          name,
        });
        this.errors = null;
      } catch (err: any) {
        console.log(err.response.data);
        this.errors = err.response.data.errors;
      }
    },

    async updateTag(id: number, { name }: any) {
      try {
        await axios.patch('http://127.0.0.1:8000/api/admin/tags/' + id, {
          name,
        });
        this.errors = null;
      } catch (err: any) {
        console.log(err.response.data);
        this.errors = err.response.data.errors;
      }
    },

    async deleteTag(id: number) {
      try {
        await axios.delete('http://127.0.0.1:8000/api/admin/tags/' + id);
        this.errors = null;
      } catch (err: any) {
        console.log(err.response.data);
        this.errors = err.response.data.errors;
      }
    }
  },
})
