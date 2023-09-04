import { hash, compare } from "bcrypt"

export interface Hasher {
    createHash(value: string): Promise<string | null>
    compareHash(hash: string, valueToCompare: string): Promise<boolean>
}

export class HashService implements Hasher {
    constructor(
        private rounds: number
    ) { }

    async createHash(value: string) {
        const hashValue = await hash(value, this.rounds)
        return hashValue || null
    }

    async compareHash(hash: string, valueToCompare: string) {
        const comparisonResult = await compare(valueToCompare, hash)
        return comparisonResult
    }
}