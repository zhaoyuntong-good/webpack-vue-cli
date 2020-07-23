<script>
	import { mapState } from 'vuex';
	import { getToken } from '@/utils/saveToLocal.js';
	export default {
		name: 'Redirect',
		computed: {
      ...mapState(['redirect'])
    },
	  created() {
	  	if (getToken()) {
		    this.$router.push({
		    	path: this.redirect
		    })
	  	} else {
	  		this.$router.push({
		    	path: '/login'
		    })
	  	}
	  },
	  render: function(h) {
	    return h()
	  }
	}
</script>