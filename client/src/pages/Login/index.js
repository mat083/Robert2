import version from '@/VERSION';
import Config from '@/config/globalConfig';
import Auth from '@/auth';

export default {
  name: 'Login',
  data() {
    let type = 'default';
    let text = this.$t('page-login.welcome');

    const { hash } = this.$route;
    switch (hash) {
      case '#bye':
        type = 'success';
        text = this.$t('page-login.bye');
        break;
      case '#expired':
        type = 'error';
        text = this.$t('page-login.error.expired-session');
        break;
      case '#restricted':
        type = 'error';
        text = this.$t('page-login.error.not-allowed');
        break;
      default:
        break;
    }

    return {
      message: { type, text, isLoading: false },
      credentials: { identifier: '', password: '' },
      version,
      apiVersion: Config.api.version,
    };
  },
  methods: {
    login() {
      this.message = {
        type: 'default',
        text: this.$t('page-login.please-wait'),
        isLoading: true,
      };

      Auth.login(this, this.credentials);
    },

    errorMessage(error) {
      let text = this.$t('errors.api-unreachable');
      if (error.code === 404) {
        text = this.$t('page-login.error.bad-infos');
      }

      this.message = {
        type: 'error',
        text,
        isLoading: false,
      };
    },
  },
};
