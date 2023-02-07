class DatabaseCall{

  private _model: any

  constructor(model: any) {
    this._model = model
    this.findAll = this.findAll.bind(this)
    this.findById = this.findById.bind(this)
    this.findOne = this.findOne.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  find = async (query: any) => {}

  findOne = async (query: any) =>
    await this._model.findOne(query)

  findById = async (query: any) => {}

  findAll = async (query: any) => {}

  create = async (data: any) => {
    const found = await this._model.findOne(data.findQuery)
    
    if(found) throw new Error('Already exists. Stopped!')
    return await this._model.create(data)
  }

  update = async (query: any) => {}

  remove = async (query: any) => {}

  
}

export default DatabaseCall