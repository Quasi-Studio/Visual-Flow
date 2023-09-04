import { Guid } from "../util/guid"
import { Color, Tricolor } from "./color"
import { Direction } from "./dire"
import { PluginConfig } from "./element-base"
import { Point } from "./point"

interface Socket {
    pos: Point,
    id: Guid,
    used: boolean,
    face: Direction
}

interface SocketInfo {
    pos: Point,
    face: Direction
}

abstract class BlockShape extends PluginConfig {
    // 其中的 pos 都是相对于 block 左上角的 offset
    abstract get color(): Tricolor
    abstract get path(): string
    abstract get text(): { text: string, pos: Point, color: Color, size: number, font: string }[]
    abstract get socket(): SocketInfo[]

}

export {
    BlockShape
}

export type {
    Socket
}
