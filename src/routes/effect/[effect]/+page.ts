import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    return { effect: params.effect };

    // error(404, 'Not found');
};

export const ssr = false;