export const configVar = () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  NODE_NAME: process.env.NODE_NAME,
  MS: {
    url_ms_sql: process.env.URL_MS_SQL,
  },
});
