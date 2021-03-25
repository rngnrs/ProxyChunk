export interface IProxy {
	address?: string
	port?: number
	addedAt?: Date
	checkedAt?: Date

	save: () => Promise<IProxy>
}
