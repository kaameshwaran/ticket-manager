export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/issues/list',
        '/issues/new',
        '/issues/edit/:id+'
    ]
}
