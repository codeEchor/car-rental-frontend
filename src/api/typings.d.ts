declare namespace API {
  type BaseResponseListMenus = {
    code?: number;
    message?: string;
    data?: Menus[];
    description?: string;
  };

  type BaseResponseListRole = {
    code?: number;
    message?: string;
    data?: Role[];
    description?: string;
  };

  type BaseResponseMapStringObject = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
    description?: string;
  };

  type BaseResponseMenus = {
    code?: number;
    message?: string;
    data?: Menus;
    description?: string;
  };

  type BaseResponseObject = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
    description?: string;
  };

  type BaseResponseResultPageListMenus = {
    code?: number;
    message?: string;
    data?: ResultPageListMenus;
    description?: string;
  };

  type BaseResponseResultPageListRole = {
    code?: number;
    message?: string;
    data?: ResultPageListRole;
    description?: string;
  };

  type BaseResponseResultPageListUserVo = {
    code?: number;
    message?: string;
    data?: ResultPageListUserVo;
    description?: string;
  };

  type BaseResponseRole = {
    code?: number;
    message?: string;
    data?: Role;
    description?: string;
  };

  type BaseResponseString = {
    code?: number;
    message?: string;
    data?: string;
    description?: string;
  };

  type BaseResponseUserVo = {
    code?: number;
    message?: string;
    data?: UserVo;
    description?: string;
  };

  type deleteMenusParams = {
    id: number;
  };

  type deleteRoleParams = {
    id: number;
  };

  type deleteUserParams = {
    id: number;
  };

  type emailLoginParams = {
    email: string;
    code: string;
  };

  type FileUploadParams = {
    file: string;
  };

  type findMenusByRidParams = {
    rid: number;
  };

  type generateEmailCodeParams = {
    email: string;
  };

  type getCodeParams = {
    codeId: string;
  };

  type getMenusByIdParams = {
    id: number;
  };

  type getRoleByIdParams = {
    id: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type listByUsernameParams = {
    username: string;
  };

  type listMenusPageParams = {
    menusPageDto: MenusPageDto;
  };

  type listRolePageParams = {
    rolePageDto: RolePageDto;
  };

  type listUserPageParams = {
    userPageDto: UserPageDto;
  };

  type Menus = {
    id?: number;
    pid?: number;
    menuName?: string;
    icon?: string;
    route?: string;
    children?: Menus[];
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
  };

  type MenusAddDto = {
    pid?: number;
    menuName?: string;
    icon?: string;
    route?: string;
  };

  type MenusPageDto = {
    pageNum?: number;
    pageSize?: number;
    menuName?: string;
    icon?: string;
    route?: string;
    pid?: number;
  };

  type MenusUpdateDto = {
    id?: number;
    pid?: number;
    menuName?: string;
    icon?: string;
    route?: string;
  };

  type ResultPageListMenus = {
    pageSize?: number;
    pageNum?: number;
    total?: number;
    data?: Menus[];
  };

  type ResultPageListRole = {
    pageSize?: number;
    pageNum?: number;
    total?: number;
    data?: Role[];
  };

  type ResultPageListUserVo = {
    pageSize?: number;
    pageNum?: number;
    total?: number;
    data?: UserVo[];
  };

  type Role = {
    id?: number;
    roleName?: string;
    remark?: string;
  };

  type RoleAddDto = {
    roleName?: string;
    remark?: string;
  };

  type RolePageDto = {
    pageNum?: number;
    pageSize?: number;
    roleName?: string;
    remark?: string;
  };

  type RoleUpdateDto = {
    id?: number;
    roleName?: string;
    remark?: string;
  };

  type updateMenusParams = {
    id: number;
  };

  type updateRoleMenusParams = {
    id: number;
  };

  type updateRoleParams = {
    id: number;
  };

  type updateUserParams = {
    id: number;
  };

  type UserAddDto = {
    username?: string;
    nickName?: string;
    money?: number;
    phone?: string;
    gender?: string;
    email?: string;
    avatar?: string;
  };

  type UserLoginDto = {
    username?: string;
    password?: string;
    code?: string;
    codeId?: string;
  };

  type UserPageDto = {
    pageNum?: number;
    pageSize?: number;
    username?: string;
  };

  type UserRegisterDto = {
    username?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
  };

  type UserUpdateDto = {
    id?: number;
    username?: string;
    phone?: string;
    gender?: string;
    email?: string;
    avatar?: string;
    nickName?: string;
    money?: number;
  };

  type UserUpdateRoleDto = {
    id?: number;
    roleList?: Role[];
  };

  type UserVo = {
    id?: number;
    username?: string;
    roleId?: number;
    nickName?: string;
    money?: number;
    phone?: string;
    gender?: string;
    email?: string;
    avatar?: string;
    createTime?: string;
    updateTime?: string;
    role?: Role[];
  };
}
