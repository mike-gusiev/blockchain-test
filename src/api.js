import axios from 'axios';

const URL = 'https://blockchain.info';

const fetchBlocks = () => axios.get(`${URL}/blocks/1568308197848?format=json&cors=true`);

const fetchTransactions = () => axios.get(`${URL}/unconfirmed-transactions?format=json&cors=true`);

const fetchTransaction = (tx_hash) => axios.get(`${URL}/rawtx/${tx_hash}?format=json&cors=true`);

export default {
  fetchBlocks,
  fetchTransactions,
  fetchTransaction
};
