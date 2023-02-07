import aqp from "api-query-params"
import { NextFunction, Request, Response } from "express"

class Controller{
  create = async (req: Request, res: Response, next: NextFunction) => {}
  findOne = async (req: Request, res: Response, next: NextFunction) => {}
  findAll = async (req: Request, res: Response, next: NextFunction) => {}
  update = async (req: Request, res: Response, next: NextFunction) => {}
  remove = async (req: Request, res: Response, next: NextFunction) => {}

  get_queryset = (req: Request) => aqp(req.query, {skipKey: 'page'})
}

export default Controller