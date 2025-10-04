declare namespace API {
  type BaseResponseBrand = {
    code?: number;
    message?: string;
    data?: Brand;
    description?: string;
  };

  type BaseResponseCarVo = {
    code?: number;
    message?: string;
    data?: CarVo;
    description?: string;
  };

  type BaseResponseCategory = {
    code?: number;
    message?: string;
    data?: Category;
    description?: string;
  };

  type BaseResponseCity = {
    code?: number;
    message?: string;
    data?: City;
    description?: string;
  };

  type BaseResponseFavorites = {
    code?: number;
    message?: string;
    data?: Favorites;
    description?: string;
  };

  type BaseResponseListBrand = {
    code?: number;
    message?: string;
    data?: Brand[];
    description?: string;
  };

  type BaseResponseListCarVo = {
    code?: number;
    message?: string;
    data?: CarVo[];
    description?: string;
  };

  type BaseResponseListCategory = {
    code?: number;
    message?: string;
    data?: Category[];
    description?: string;
  };

  type BaseResponseListCity = {
    code?: number;
    message?: string;
    data?: City[];
    description?: string;
  };

  type BaseResponseListFavorites = {
    code?: number;
    message?: string;
    data?: Favorites[];
    description?: string;
  };

  type BaseResponseListMenus = {
    code?: number;
    message?: string;
    data?: Menus[];
    description?: string;
  };

  type BaseResponseListNews = {
    code?: number;
    message?: string;
    data?: News[];
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

  type BaseResponseNews = {
    code?: number;
    message?: string;
    data?: News;
    description?: string;
  };

  type BaseResponseObject = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
    description?: string;
  };

  type BaseResponseResultPageListBrand = {
    code?: number;
    message?: string;
    data?: ResultPageListBrand;
    description?: string;
  };

  type BaseResponseResultPageListCarVo = {
    code?: number;
    message?: string;
    data?: ResultPageListCarVo;
    description?: string;
  };

  type BaseResponseResultPageListCategory = {
    code?: number;
    message?: string;
    data?: ResultPageListCategory;
    description?: string;
  };

  type BaseResponseResultPageListCity = {
    code?: number;
    message?: string;
    data?: ResultPageListCity;
    description?: string;
  };

  type BaseResponseResultPageListFavorites = {
    code?: number;
    message?: string;
    data?: ResultPageListFavorites;
    description?: string;
  };

  type BaseResponseResultPageListMenus = {
    code?: number;
    message?: string;
    data?: ResultPageListMenus;
    description?: string;
  };

  type BaseResponseResultPageListNews = {
    code?: number;
    message?: string;
    data?: ResultPageListNews;
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

  type Brand = {
    id?: number;
    brandImg?: string;
    brandName?: string;
  };

  type BrandAddDto = {
    brandName?: string;
    brandImg?: string;
  };

  type BrandPageDto = {
    pageSize?: number;
    pageNum?: number;
    brandName?: string;
    brandImg?: string;
  };

  type BrandUpdateDto = {
    id?: number;
    brandName?: string;
    brandImg?: string;
  };

  type CarAddDto = {
    carName?: string;
    carImg?: string;
    brandId?: number;
    categoryId?: number;
    year?: number;
    stock?: number;
    price?: number;
    color?: string;
    cityId?: number;
    doorCount?: string;
    seatCount?: string;
    mileage?: string;
    tankCapacity?: string;
    displacement?: string;
    fuelType?: string;
    description?: string;
  };

  type CarPageDto = {
    carName?: string;
    brandId?: number;
    categoryId?: number;
    pageSize?: number;
    pageNum?: number;
  };

  type CarUpdateDto = {
    id?: number;
    carName?: string;
    carImg?: string;
    brandId?: number;
    categoryId?: number;
    year?: number;
    stock?: number;
    price?: number;
    color?: string;
    cityId?: number;
    doorCount?: string;
    seatCount?: string;
    mileage?: string;
    tankCapacity?: string;
    displacement?: string;
    fuelType?: string;
    description?: string;
  };

  type CarVo = {
    id?: number;
    carName?: string;
    carImg?: string;
    brandId?: number;
    categoryId?: number;
    status?: number;
    year?: number;
    stock?: number;
    price?: number;
    color?: string;
    favoritesNum?: number;
    cityId?: number;
    doorCount?: string;
    seatCount?: string;
    mileage?: string;
    tankCapacity?: string;
    displacement?: string;
    fuelType?: string;
    description?: string;
  };

  type Category = {
    id?: number;
    categoryName?: string;
  };

  type CategoryAddDto = {
    categoryName?: string;
  };

  type CategoryPageDto = {
    pageSize?: number;
    pageNum?: number;
    categoryName?: string;
  };

  type CategoryUpdateDto = {
    id?: number;
    categoryName?: string;
  };

  type City = {
    id?: number;
    cityName?: string;
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
  };

  type CityAddDto = {
    cityName?: string;
  };

  type CityPageDto = {
    pageNum?: number;
    pageSize?: number;
    cityName?: string;
  };

  type CityUpdateDto = {
    id?: number;
    cityName?: string;
  };

  type deleteBrandParams = {
    id: number;
  };

  type deleteCarParams = {
    id: number;
  };

  type deleteCategoryParams = {
    id: number;
  };

  type deleteCityParams = {
    id: number;
  };

  type deleteFavoritesParams = {
    id: number;
  };

  type deleteMenusParams = {
    id: number;
  };

  type deleteNewsParams = {
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

  type Favorites = {
    id?: number;
    carId?: number;
    carName?: string;
    carImg?: string;
    description?: string;
    userId?: number;
    username?: string;
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
  };

  type FavoritesAddDto = {
    carId?: number;
    carName?: string;
    carImg?: string;
    description?: string;
    userId?: number;
    username?: string;
  };

  type FavoritesPageDto = {
    pageSize?: number;
    pageNum?: number;
    carName?: string;
    userName?: string;
  };

  type FavoritesUpdateDto = {
    id?: number;
    carName?: string;
    carImg?: string;
    description?: string;
    username?: string;
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

  type getBrandByIdParams = {
    id: number;
  };

  type getCarByIdParams = {
    id: number;
  };

  type getCategoryByIdParams = {
    id: number;
  };

  type getCityByIdParams = {
    id: number;
  };

  type getCodeParams = {
    codeId: string;
  };

  type getFavoritesByIdParams = {
    id: number;
  };

  type getMenusByIdParams = {
    id: number;
  };

  type getNewsByIdParams = {
    id: number;
  };

  type getRoleByIdParams = {
    id: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type listBrandPageParams = {
    brandPageDto: BrandPageDto;
  };

  type listByUsernameParams = {
    username: string;
  };

  type listCarPageParams = {
    carPageDto: CarPageDto;
  };

  type listCategoryPageParams = {
    categoryPageDto: CategoryPageDto;
  };

  type listCityPageParams = {
    cityPageDto: CityPageDto;
  };

  type listFavoritesPageParams = {
    favoritesPageDto: FavoritesPageDto;
  };

  type listMenusPageParams = {
    menusPageDto: MenusPageDto;
  };

  type listNewsPageParams = {
    newsPageDto: NewsPageDto;
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

  type News = {
    id?: number;
    title?: string;
    newImg?: string;
    content?: string;
    userId?: number;
    author?: string;
    isDelete?: number;
    createTime?: string;
    updateTime?: string;
  };

  type NewsAddDto = {
    title?: string;
    content?: string;
    author?: string;
    newImg?: string;
    userId?: number;
  };

  type NewsPageDto = {
    pageNum?: number;
    pageSize?: number;
    title?: string;
    author?: string;
    content?: string;
  };

  type NewsUpdateDto = {
    id?: number;
    title?: string;
    content?: string;
    newImg?: string;
  };

  type ResultPageListBrand = {
    pageSize?: number;
    pageNum?: number;
    total?: number;
    data?: Brand[];
  };

  type ResultPageListCarVo = {
    pageSize?: number;
    pageNum?: number;
    total?: number;
    data?: CarVo[];
  };

  type ResultPageListCategory = {
    pageSize?: number;
    pageNum?: number;
    total?: number;
    data?: Category[];
  };

  type ResultPageListCity = {
    pageSize?: number;
    pageNum?: number;
    total?: number;
    data?: City[];
  };

  type ResultPageListFavorites = {
    pageSize?: number;
    pageNum?: number;
    total?: number;
    data?: Favorites[];
  };

  type ResultPageListMenus = {
    pageSize?: number;
    pageNum?: number;
    total?: number;
    data?: Menus[];
  };

  type ResultPageListNews = {
    pageSize?: number;
    pageNum?: number;
    total?: number;
    data?: News[];
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

  type updateBrandParams = {
    id: number;
  };

  type updateCarParams = {
    id: number;
  };

  type updateCategoryParams = {
    id: number;
  };

  type updateCityParams = {
    id: number;
  };

  type updateFavoritesParams = {
    id: number;
  };

  type updateMenusParams = {
    id: number;
  };

  type updateNewsParams = {
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
