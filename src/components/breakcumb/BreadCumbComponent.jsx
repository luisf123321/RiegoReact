import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { BreadcrumbItem } from './Breaditem';

function BreadcrumbExample() {
    return (
        <div className="container mt-2">
            <Breadcrumb>
                <Breadcrumb.Item href="#">Fincas</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
}

export default BreadcrumbExample;