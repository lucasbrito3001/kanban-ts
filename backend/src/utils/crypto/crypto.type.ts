export interface ICryptoService {
    createHash(value: string): Promise<string | null>;
    compareHash(hash: string, valueToCompare: string): Promise<boolean>;
}