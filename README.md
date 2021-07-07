# WorkspaceApi
purpose : add workspace api feature to LWC

## currently supported feature :

- getFocusedTabInfo
- closetab
- opentab

## How to use :
first : import the module inside your lwc : 
```import WorkspaceApi from 'c/workspaceApi';```

then create a method that will use the needed feature like below example :
```
  closeTab() {
    const myWorkspaceApi = new WorkspaceApi();
    myWorkspaceApi.closeFocusedTab();
  }
```
