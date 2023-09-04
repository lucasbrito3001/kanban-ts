export interface Hasher {
    createHash(value: string): Promise<string | null>
    compareHash(hash: string, valueToCompare: string): Promise<boolean>
}

export class HashService implements Hasher {
    constructor(
        private rounds: number,
        private hash: (data: string, saltOrRounds: number) => Promise<string>,
        private compare: (data: string, encrypted: string) => Promise<boolean>,
    ) { }

    async createHash(value: string) {
        const hashValue = await this.hash(value, this.rounds)
        return hashValue || null
    }

    async compareHash(hash: string, valueToCompare: string) {
        const comparisonResult = await this.compare(valueToCompare, hash)
        return comparisonResult
    }
}