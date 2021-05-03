# create-milestone-action
Creating a milestone or returning an existing one. Pure JS action.

## Inputs

### `token`

**Required** Github Token.

### `title`

**Required** The title of the milestone.

### `state`

The state of the milestone. Either `open` or `closed`. Default `open`.

### `description`

A description of the milestone.

### `due_on`

The milestone due date. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.


## Outputs

### `id`

The ID of the created milestone.

### `number`

The Number of the created milestone.

### `state`

The State of the created milestone.

## Example usage

```yaml
uses: sv-tools/create-milestone-action@v1
with:
  token: ${{ secrets.GITHUB_TOKEN }}
  title: Next
  description: Next Release, To be renamed with a proper semver.
```
