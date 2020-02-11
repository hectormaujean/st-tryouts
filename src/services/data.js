import { securedApi } from './config';

export const getBandwidth = async (from, to, aggregate) => securedApi.post('/bandwidth', aggregate ? { from, to, aggregate } : { from, to });

export const getAudience = async (from, to, aggregate) => securedApi.post('/audience', aggregate ? { from, to, aggregate } : { from, to });

export const getStreams = async () => securedApi.post('/streams');

export const getCountries = async () => securedApi.post('/countries');

export const getIsps = async () => securedApi.post('/isps');

export const getPlatforms = async () => securedApi.post('/platforms');
