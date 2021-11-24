import {
    useCallback,
    useEffect,
    useRef,
    useReducer,
    useMemo,
    useState
} from 'react';
import useRequest from './useRequest';

const useTableInitState = {
    current: 1, // 当前页码
    pageSize: 10, // 分页大小
    total: 0, // 总页数
    data: [], // 列表数据,
    count: 0, // 计数器主要是为了刷新
    formData: {}, // 搜搜的数据,
    sorter: null, // 排序,
    filters: null // 筛选
};
interface useTableInitProps {
    current?: number; // 当前页码
    pageSize?: number; // 分页大小
    total?: number; // 总页数
    data?: Record<string, any>[]; // 列表数据,
    count?: number; // 计数器主要是为了刷新
    formData?: Record<string, any>; // 搜搜的数据,
    sorter?: null; // 排序,
    filters?: null; // 筛选
}
interface PageInterface {
    defaultPageSize?: number;
    [key: string]: any;
}
interface RequestInterface {
    fun(useData?: any): Promise<any>;
    options?: PageInterface;
    withTable?: boolean;
    needPage?: boolean;
    deps?: Array<any>;
    initRequest?: boolean;
}
const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'updateState':
            return { ...state, ...action.payload };
        default:
            throw new Error();
    }
};

export default ({
    fun,
    deps = [],
    needPage = true,
    options,
    withTable = true,
    initRequest = true
}: RequestInterface) => {
    // const [state, setState] = useState<useTableInitProps>(useTableInitState);

    const [state, dispatch] = useReducer(reducer, {
        ...useTableInitState,
        pageSize: options?.defaultPageSize ?? 10
    });

    // 依赖变化的事件
    useEffect(() => {
        if (state.count) {
            getResult();
        }
    }, [state.count]);

    // 请求
    const { loading, requestAction } = useRequest({
        fun,
        deps: [...deps], //
        initRequest: false //
    });

    // 发出请求
    const getResult = () => {
        const params = {
            ...state.formData,
            params: {
                pageNum: state.current,
                pageSize: state.pageSize
            }
        };
        requestAction(params).then(res => {
            let payload = {
                data: [],
                total: 0
            };
            if (res.code === 200) {
                payload = {
                    data: res.rows,
                    total: res.total
                };
            }
            dispatch({
                type: 'updateState',
                payload
            });
        });
    };
    // 筛选
    const searchSubmit = item => {
        const payload = {
            formData: item,
            count: state.count + 1
        };
        dispatch({
            type: 'updateState',
            payload
        });
    };
    // 分页
    const onChange = pagination => {
        const payload = {
            current: pagination.current,
            pageSize: pagination.pageSize,
            count: state.count + 1
        };
        dispatch({
            type: 'updateState',
            payload
        });
    };
    return {
        tableProps: {
            dataSource: state.data ?? [],
            onChange,
            loading,
            pagination: {
                current: state.current,
                pageSize: state.pageSize,
                total: state.total
            }
        },
        search: {
            submit: searchSubmit
        }
    };
};
