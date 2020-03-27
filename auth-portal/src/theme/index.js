import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    // palette,
    // typography,
    // overrides,
    zIndex: {
        appBar: 1200,
        drawer: 1100
    }
});

export default theme