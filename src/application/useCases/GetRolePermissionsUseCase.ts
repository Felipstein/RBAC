import { prismaClient } from '../libs/prismaClient';

interface IInput {
  roleId: string
}

interface IOutput {
  permissionsCodes: string[]
}

export class GetRolePermissionsUseCase {

  async execute({ roleId }: IInput): Promise<IOutput> {

    /**
     * SELECT permissionCode from role_permissions WHERE role_id = roleId
     */
    const rolePermissions = await prismaClient.rolePermission.findMany({
      where: { roleId },
      select: { permissionCode: true },
    });

    const permissionsCodes = rolePermissions.map(rolePermission => rolePermission.permissionCode);

    return { permissionsCodes };
  }

}
