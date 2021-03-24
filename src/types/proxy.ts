export interface IProxy {
	address: string
	port: number
	addedAt: number
	checkedAt?: number

	save: () => Promise<this>
	find: () => Promise<this[]>
}
