import axios from 'axios';
import {API_BASE_URL} from './env.dev';
import {generateUUID} from '../utils/JsHelper/helper';

//dev-uba-bap.tekdinext.com/api/content/search

export const getAll = async userData => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/content/search`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

/**
 * Login a user
 * @param {Object} loginData - Contains phone_number, password
 */
export const getOne = async ({id}) => {
  const loginData = {
    context: {
      domain: 'onest:financial-support',
      action: 'select',
      timestamp: '2023-08-02T07:21:58.448Z',
      ttl: 'PT10M',
      version: '1.1.0',
      bap_id: 'dev-uba-bap.tekdinext.com',
      bap_uri: 'https://dev-uba-bap.tekdinext.com/',
      bpp_id: 'dev-uba-bpp.tekdinext.com',
      bpp_uri: 'https://dev-uba-bpp.tekdinext.com/',
      transaction_id: generateUUID(),
      message_id: generateUUID(),
    },
    message: {
      order: {
        items: [
          {
            id,
          },
        ],
        provider: {
          id: 'BX213573733',
        },
      },
    },
  };
  try {
    const response = await axios.post(`${API_BASE_URL}/select`, loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response || {};
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const applyApplication = async ({id, context}) => {
  const loginData = {
    context: {
      ...context,
      action: 'init',
    },
    message: {
      order: {
        items: [
          {
            id,
          },
        ],
      },
    },
  };
  try {
    const response = await axios.post(`${API_BASE_URL}/init`, loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response || {};
  } catch (error) {
    console.log('error', error.message, JSON.stringify(loginData));

    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const confirmApplication = async data => {
  try {
    const response = await axios.post(`${API_BASE_URL}/confirm`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response || {};
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
