import { Point } from "../util/coordinate";
import { BlockShape } from "./block";

const BlockPreset: { [k: string]: BlockShape } = {
    test: {
        path: () => "M 0 0 H 10 V 10 H 0 Z",
        text: () => [{
            text: "Hello",
            pos: new Point(100, 100)
        }],
        socket: () => []
    }
}

export default BlockPreset