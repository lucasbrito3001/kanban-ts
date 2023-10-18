import { Inject, Injectable } from '@nestjs/common';
import { ICryptoService } from './crypto.type';

@Injectable()
export class CryptoService implements ICryptoService {
    constructor(
        @Inject('HASH_ROUNDS')
        private rounds: number,
        @Inject('HASH_FUNCTION')
        private hash: (data: string, saltOrRounds: number) => Promise<string>,
        @Inject('COMPARE_FUNCTION')
        private compare: (data: string, encrypted: string) => Promise<boolean>,
    ) {}

    async createHash(value: string) {
        const hashValue = await this.hash(value, +this.rounds);
        return hashValue || null;
    }

    async compareHash(hash: string, valueToCompare: string) {
        const comparisonResult = await this.compare(valueToCompare, hash);
        return comparisonResult;
    }
}
