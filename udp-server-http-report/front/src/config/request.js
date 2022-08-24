export default {
    auth: {
        signin: '/auth/login',
        logout: '/auth/logout',
        refresh: '/auth/refresh'
    },
    lunwen: {
        upload: '/lunwen/upload',
        uploads: '/lunwen/uploads',
        deleteSingle: '/lunwen/{id}',
        update: '/lunwen/{id}',
        show: '/lunwen/{id}',
        index: '/lunwen',
        removes: '/lunwen'
    },
    info: {
        delete: '/info/{id}',
        update: '/info/{id}',
        show: '/info/{id}',
        index: '/info',
        create: '/info',
        multi: '/multi'
    }
}
