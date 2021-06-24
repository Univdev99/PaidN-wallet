// import React from 'react';
import NewWallet from '../pages/auth/createWallet/index'
import UploadNTF from '../pages/dashboard/upload/index'
import NTFDetails from '../pages/dashboard/details-ntf/index'
import SignedMedia from '../pages/dashboard/signedMedia/index'
import Details from '../pages/dashboard/details/index'
import Done from '../pages/dashboard/completed/index'
import TransactionDetail from '../pages/dashboard/details-transaction/index'

const route = [
    { path: '/new-wallet', exact: true, name: 'Create Wallet', component: NewWallet },
    { path: '/upload', exact: true, name: 'UploadNTF', component: UploadNTF },
    { path: '/ntf-details', exact: true, name: 'NTFDetails', component: NTFDetails },
    { path: '/signed-media', exact: true, name: 'SignedMedia', component: SignedMedia },
    { path: '/details', exact: true, name: 'Details', component: Details },
    { path: '/done', exact: true, name: 'Done', component: Done },
    { path: '/transaction-details', exact: true, name: 'TransactionDetail', component: TransactionDetail },
];

export default route;