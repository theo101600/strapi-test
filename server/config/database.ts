import path from "path";

export default ({ env }) => {
  // Force Postgres in production (Strapi Cloud)
  const client =
    env("NODE_ENV") === "production"
      ? "postgres"
      : env("DATABASE_CLIENT", "sqlite");

  const connections = {
    postgres: {
      connection: {
        // Strapi Cloud provides DATABASE_URL
        connectionString: env("DATABASE_URL"),
        ssl: env.bool("DATABASE_SSL", true),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },

    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
