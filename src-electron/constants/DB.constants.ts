export const DB_SOURCE_FOLDER = './src-electron/';
export const DB_BASE_NAME = 'computer-usage-tracker';
export const DB_EXTENSION = 'db';
export const USERS_DATASTORE = 'users';
export const USERS_DATASTORE_FULL_NAME = getDatastoreFullName(USERS_DATASTORE);

function getDatastoreFullName(datastoreName: string) {
	return `
    ${DB_SOURCE_FOLDER}
    ${DB_BASE_NAME}-${datastoreName}.${DB_EXTENSION}
  `.replace(/\s/g, '');
}
