import { connection } from './connection.js';
import DataLoader from 'dataloader';

const getCompanyTable = () => connection.table('company');

export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}

// NOTE: Data loader examples, this approach is called global instance with global cache
export const companyLoader = new DataLoader(async (ids) => {
  const companies = await getCompanyTable().select().whereIn('id', ids);
  // NOTE: The return order of companies may not be same as inout order of Ids
  return ids.map((id) => companies.find((company) => company.id === id));
});

export const createCompanyLoaderInstance = () => {
  return new DataLoader(async (ids) => {
    // console.log('companyLoader ids: ', ids);
    const companies = await getCompanyTable().select().whereIn('id', ids);
    // NOTE: The return order of companies may not be same as inout order of Ids
    return ids.map((id) => companies.find((company) => company.id === id));
  });
};
