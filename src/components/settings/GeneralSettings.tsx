import SettingsPage from "../SettingsPage";

interface props {
    currentlyShown: boolean;
}

function GeneralSettings ({currentlyShown} : props) {
    return (
        <SettingsPage currentlyShown={currentlyShown}>
            <h1>General</h1>
        </SettingsPage>
    )
}

export default GeneralSettings