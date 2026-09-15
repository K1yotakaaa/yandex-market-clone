
    export type RemoteKeys = 'header/Header';
    type PackageType<T> = T extends 'header/Header' ? typeof import('header/Header') :any;