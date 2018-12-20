export const DB_SOURCE_FOLDER = './src-electron/db/';
export const DB_BASE_NAME = 'computer-usage-tracker';
export const DB_EXTENSION = 'db';
export const USERS_DATASTORE = 'users';
export const FILES_DATASTORE = 'files';
export const CURRENT_USAGE_DATASTORE = 'current-usage';
export const USERS_DATASTORE_FULL_NAME = getDatastoreFullName(USERS_DATASTORE);
export const FILES_DATASTORE_FULL_NAME = getDatastoreFullName(FILES_DATASTORE);
export const CURRENT_USAGE_DATASTORE_FULL_NAME = getDatastoreFullName(
	CURRENT_USAGE_DATASTORE
);

function getDatastoreFullName(datastoreName: string) {
	return `
    ${DB_SOURCE_FOLDER}
    ${DB_BASE_NAME}-${datastoreName}.${DB_EXTENSION}
  `.replace(/\s/g, '');
}
