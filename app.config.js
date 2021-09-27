import 'dotenv/config';

export default {
  name: 'Biostack',
  slug: 'Biostack',
  facebookScheme: `fb${process.env.FACEBOOK_APP_ID}`,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookDisplayName: 'Biostack',
  facebookAutoLogAppEventsEnabled: false,
  facebookAdvertiserIDCollectionEnabled: false,
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    package: "com.aarnipavlidi.Biostack",
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF'
    }
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    env: process.env.ENV,
    server: process.env.APOLLO_URI,
    email_service_id: process.env.EMAIL_SERVICE_ID,
    email_template_id: process.env.EMAIL_TEMPLATE_ID,
    email_user_id: process.env.EMAIL_USER_ID
  }
}
