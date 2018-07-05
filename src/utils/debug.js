import debug from 'debug'
import { name } from '../../package.json'
export default (str) => debug(`${name}:${str}`)
