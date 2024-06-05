- [ ] Refactor Settings to SettingsSidebar and SettingsContent

- [ ] Finish Content Settings Page
- [ ] Add Content
- [ ] Add Content Editing
- [ ] Add Styling Editing

- [ ] Finish Theme Settings Page
- [ ] Add Custom Theme functionality
  
- [ ] Create a general settings page where the user can make a string that they can then copy to another computer and keep their same settings w/ lz-string



## Main To Do List 

# Theme

**Optimize theme usage by minimizing**

- Separate Theme into
  - [ ] Use an App State with a enum {LIGHT, DARK, CUSTOM}
    - [ ] use a specific theme for light and dark
    - [ ] for custom, we can implement something that gets the localstorage theme
  - [ ] Use an enum to store names
  - [ ] instead of separating sizes, and colors into 2 objects, we can just spread sizes into the new theme array
  - [ ] 2 theme variables (light, dark)
  - [ ] Instead of switching the theme inside of header, the function should be done through App.tsx
    - [ ] Maybe use a function that returns the theme based on the state enum