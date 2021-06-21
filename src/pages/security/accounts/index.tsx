import { React } from "mdi-material-ui";
import PageTitle from "../../../components/PageTitle";
import {useEffect, useMemo, useState} from "react";
import AddAccountDialog from "../../../components/AddAccountDIalog";
import {Avatar, IconButton} from "@material-ui/core";
import {MoreVert as MoreVertIcon, PersonAdd as PersonAddIcon} from "@material-ui/icons"
import GridLoadingOverlay from "../../../components/Grid/LoadingOverlay";
import GridNoRowsOverlay from "../../../components/Grid/NoRowsOverlay";
import {DataGrid, GridColDef} from "@material-ui/data-grid";
import Account from "../../../types/Account";
import {useServerManager} from "../../../components/ServerManagerProvider";


function Accounts() {

    const serverManager = useServerManager()

    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [accounts, setAccount] = useState<Account[]>([])

    const columns = useMemo<GridColDef[]>(() => {
        return [
            {
                field: "name",
                headerName: "Nombre",
                disableColumnMenu: true,
                sortable: false,
                flex: 0.8,
            },
            {
                field: "lastName",
                headerName: "Apellido",
                disableColumnMenu: true,
                sortable: false,
                flex: 0.8,
            },
            {
                field: "email",
                headerName: "Email",
                disableColumnMenu: true,
                sortable: false,
                flex: 0.3,
            },
            {
                field: "rol",
                headerName: "Rol",
                disableColumnMenu: true,
                sortable: false,
                flex: 0.3,
            },
            {
                field: "createdAt",
                headerName: "Fecha de Creación",
                disableColumnMenu: true,
                sortable: false,
                flex: 0.3,
            },
            {
                field: "avatarPath",
                headerName: "Avatar",
                disableColumnMenu: true,
                sortable: false,
                flex: 0.18,
                renderCell: () => <Avatar/>
            }
        ];
    }, []);

    useEffect( () => {
        serverManager
            .loadAccount()
            .then( r => console.log(r))
    })

    return (
        <div>
            <PageTitle title="Cuentas de usuario">
                <IconButton onClick={() => setIsOpenDialog(true)}>
                    <PersonAddIcon/>
                </IconButton>
            </PageTitle>
            <AddAccountDialog isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)}/>
            <DataGrid
                rows={accounts}
                columns={columns}
                rowCount={accounts.length}
                page={currentPage}
                pageSize={pageSize}
                onPageChange={(params) => {
                    setCurrentPage(params.page);
                }}
                onPageSizeChange={(params) => {
                    setPageSize(params.pageSize);
                }}
                rowsPerPageOptions={[10, 25, 50]}
                pagination
                loading={isLoading}
                autoHeight
                disableSelectionOnClick
                components={{
                    LoadingOverlay: GridLoadingOverlay,
                    NoRowsOverlay: GridNoRowsOverlay,
                }}
            />
        </div>
    );
}

export default Accounts;
