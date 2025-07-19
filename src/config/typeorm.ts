import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

export default registerAs('typeorm', () => {
    const isProduction = process.env.NODE_ENV === 'production';

    return isProduction ? {
        type: 'postgress',
        url: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: true,
    } : {
        type: 'postgres',
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '', 10) || 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
    }
});

// export default registerAs('typeorm', () => config)
// export const connectionSource = new DataSource(config)