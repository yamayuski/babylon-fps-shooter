/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 */

/**
 * Scene base interface
 */
export interface SceneInterface {
    /**
     * Start this scene
     */
    start(): Promise<void>;

    /**
     * Dispose this scene
     */
    dispose(): Promise<void>;

    /**
     * Rendering this scene
     */
    render(): Promise<void>;
}
