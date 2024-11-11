import Mailcow from "./mailcow";
import Backend from "./backend";

const backends: Record<string, typeof Backend> = { MAILCOW: Mailcow };

export default backends;
