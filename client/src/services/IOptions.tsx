interface IOptions {
    method: string;
    body?: any;
    headers?: Record<string, string> | HeadersInit | undefined;
    credentials?: 'omit' | 'same-origin' | 'include';
}

export default IOptions;