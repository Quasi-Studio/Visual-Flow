import { Workspace } from "./workspace";

function inject(id: string): void {
    let ws = new Workspace(id)
}

export default inject