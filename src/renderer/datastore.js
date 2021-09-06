import DataSource from "nedb"
import path from "path"
import { remote } from "electron"

export default new DataSource({
	autoload: true,
	filename: path.join(remote.app.getPath("userData"), "/tomato-clock.db"),
})
